'use client';

import { useState } from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { ChevronDown } from "lucide-react";
import { countries, type Country } from "@/lib/countries";

interface PhoneInputProps {
  id?: string;
  name: string;
  required?: boolean;
}

export function PhoneInput({ id = "phone", name, required = true }: PhoneInputProps) {
  const [selectedCountry, setSelectedCountry] = useState(countries[0]);
  const [phoneNumber, setPhoneNumber] = useState("");

  return (
    <div className="space-y-2">
      <Label htmlFor={id}>Phone Number</Label>
      <div className="flex">
        <Popover>
          <PopoverTrigger asChild>
            <Button 
              type="button"
              variant="outline" 
              className="flex items-center justify-between w-32 border-r-0 rounded-r-none h-10 px-3"
            >
              <div className="flex items-center gap-2">
                <span className="text-lg">{selectedCountry.flag}</span>
                <span className="text-sm font-medium">{selectedCountry.dialCode}</span>
              </div>
              <ChevronDown className="h-3 w-3 opacity-50" />
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-56 p-0 max-h-60 overflow-auto">
            <div className="overflow-y-auto max-h-60">
              {countries.map((country) => (
                <div
                  key={country.code}
                  className="flex items-center gap-2 p-2 hover:bg-slate-100 cursor-pointer text-sm"
                  onClick={() => setSelectedCountry(country)}
                >
                  <span className="text-lg w-6 text-center">{country.flag}</span>
                  <span>{country.name}</span>
                </div>
              ))}
            </div>
          </PopoverContent>
        </Popover>
        
        <Input
          id={id}
          name={name}
          type="tel"
          value={phoneNumber}
          onChange={(e) => setPhoneNumber(e.target.value)}
          className="rounded-l-none w-full"
          placeholder="Phone number"
          required={required}
        />
        
        {/* Hidden input to store the full phone number with country code */}
        <input 
          type="hidden" 
          name={name}
          value={`${selectedCountry.dialCode}${phoneNumber}`} 
        />
      </div>
      <p className="text-xs text-muted-foreground mt-1">
        Include country code with + prefix (automatically added)
      </p>
    </div>
  );
}