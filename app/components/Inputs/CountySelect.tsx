'use client'
import useCountries from '@/app/hooks/useCountries';
import Select from 'react-select';

export type CountySelectValue = {
    flag: string;
    label: string;
    latlng: number[];
    region: string;
    value: string;
}

interface CountySelectProps {
    value?: CountySelectValue;
    onChange: (value: CountySelectValue) => void;
}

const CountySelect: React.FC<CountySelectProps> = ({
    value,
    onChange
}) => {
    const { getAll } = useCountries();

    return (
        <div>
            <Select
                placeholder="Anywhere"
                isClearable
                options={getAll()}
                value={value}
                onChange={(value) => onChange(value as CountySelectValue)}
                formatOptionLabel={(option: any) => (
                    <div className="flex flex-row items-center gap-3">
                        <div>{option.flag}</div>
                        <div>
                            {option.label}, 
                            <span className="text-nuteral-500 ml-1">
                                {option.region}
                            </span>
                        </div>
                    </div>
                )}
                classNames={{
                    control: () => "p-3 border-2",
                    input: () => "text-lg",
                    option: () => "text-lg", 
                }}
                theme={(theme) => ({
                    ...theme,
                    borderRadius: 6,
                    colors: {
                        ...theme.colors,
                        primary25: "#ffe4e6",
                        primary: "black",
                    },
                })}
            />
        </div>
    )
}

export default CountySelect;