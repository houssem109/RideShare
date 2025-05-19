import { api } from "./constants"

type Params = {
   token?: string | null
   params?: Record<string, any>
}

type RequestParams = Params & {
   body?: Record<string, any> | FormData
}

type ReturnData<T = any> = {
   data: T
   status: number
}

class APIClient {
   private static headers = {
      "Content-Type": "application/json",
   }

   private static async request<T = any>(
      url: string,
      options: RequestInit,
   ): Promise<ReturnData<T>> {
      const response = await fetch(api + url, options)

      if (!response.ok) {
         // Parse the error response and throw a detailed error
         try {
            const errorResponse = await response.json()
            throw {
               status: response.status,
               data: errorResponse,
               message: errorResponse?.message || `Error! Status: ${response.status}`,
            }
         } catch (parseError) {
            // If parsing fails, throw a generic error
            throw {
               status: response.status,
               data: null,
               message: `Error! Status: ${response.status}`,
            }
         }
      }

      // Handle cases where response might be empty (like DELETE operations)
      const contentType = response.headers.get("content-type")
      if (contentType && contentType.includes("application/json")) {
         try {
            const data = await response.json()
            return { data, status: response.status }
         } catch (error) {
            // If JSON parsing fails, return empty data object
            return { data: {} as T, status: response.status }
         }
      } else {
         // For non-JSON responses (like empty responses from DELETE)
         return { data: {} as T, status: response.status }
      }
   }

   // Helper function to convert query parameters to a query string
   private static buildQueryString(
      params: Record<string, any> | undefined,
   ): string {
      if (!params) return ""
      const query = new URLSearchParams()

      Object.entries(params)
         .filter(([_, value]) => value !== null && value !== undefined)
         .forEach(([key, value]) => {
            if (Array.isArray(value)) {
               value.forEach((item) => query.append(key, item.toString()))
            } else {
               query.append(key, value.toString())
            }
         })

      const queryString = query.toString()
      return queryString ? `?${queryString}` : ""
   }

   static async get<T = any>(
      url: string,
      { token, params }: Params = {},
   ): Promise<ReturnData<T>> {
      const fullUrl = url + this.buildQueryString(params)
      return this.request<T>(fullUrl, {
         method: "GET",
         headers: {
            ...this.headers,
            ...(token ? { Authorization: `Bearer ${token}` } : {}),
         },
      })
   }

   static async post<T = any>(
      url: string,
      { body, token, params }: RequestParams,
   ): Promise<ReturnData<T>> {
      const isFormData = body instanceof FormData
      const fullUrl = url + this.buildQueryString(params)

      const headers: Record<string, string> = {
         ...(token ? { Authorization: `Bearer ${token}` } : {}),
      }

      if (!isFormData) {
         headers["Content-Type"] = "application/json"
      }

      return this.request<T>(fullUrl, {
         method: "POST",
         headers,
         body: isFormData ? body : JSON.stringify(body),
      })
   }

   static async put<T = any>(
      url: string,
      { body, token }: RequestParams,
   ): Promise<ReturnData<T>> {
      const isFormData = body instanceof FormData

      const headers: Record<string, string> = {
         ...(token ? { Authorization: `Bearer ${token}` } : {}),
      }

      if (!isFormData) {
         headers["Content-Type"] = "application/json"
      }

      return this.request<T>(url, {
         method: "PUT",
         headers,
         body: isFormData ? body : JSON.stringify(body),
      })
   }

   static async delete<T = any>(
      url: string,
      { token }: Params = {},
   ): Promise<ReturnData<T>> {
      return this.request<T>(url, {
         method: "DELETE",
         headers: {
            ...this.headers,
            ...(token ? { Authorization: `Bearer ${token}` } : {}),
         },
      })
   }
}

export const apiClient = APIClient