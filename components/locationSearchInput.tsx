import { forwardRef, useState, useMemo } from "react";
import { Input } from "@/components/ui/input";
import citiesList from "@/lib/cities-list";

interface LocationSearchInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
    onLocationSelected: (location: string) => void;
}

export default forwardRef<HTMLInputElement, LocationSearchInputProps> (function LocationSearchInput({
    onLocationSelected, ...props
}, ref) {
    const [locationSearchInput, setLocationSearchInput] = useState("");
    const [hasfocus, setHasFocus] = useState(false);

    const cities = useMemo(() => {
        if(!locationSearchInput.trim()) return [];

        const searchWord = locationSearchInput.split(" ");

        return citiesList
            .map((city) => `${city.name}, ${city.subcountry}, ${city.country}`)
            .filter(
                (city) => 
                    city.toLowerCase().startsWith(searchWord[0].toLowerCase()) && searchWord.every((word) => 
                        city.toLowerCase().includes(word.toLowerCase()),
                    ),
            )
            .slice(0, 5);
    }, [locationSearchInput])

    return (
        <div className="relative">
            <Input 
                placeholder="Search for a city"
                type="search"
                value={locationSearchInput}
                onChange={(e) =>setLocationSearchInput(e.target.value)} 
                onFocus={() => setHasFocus(true)}
                onBlur={() => setHasFocus(false)}
                {...props} 
                ref={ref}  
            />
            {locationSearchInput.trim() && hasfocus && (
                <div className="absolute z-20 divide-y bg-background shadow-xl border-x border-b rounded-b-lg">
                    {!cities.length && <p className="p-2">No result found</p>}
                    {cities.map(city => (
                        <button 
                            key={city} 
                            className="block w-full text-start p-2"
                            onMouseDown={(e) => {
                                e.preventDefault();
                                onLocationSelected(city);
                                setLocationSearchInput("");
                            }}
                        >
                            {city}
                        </button>
                    ))}
                </div>
            )}
        </div>    
    )
})
