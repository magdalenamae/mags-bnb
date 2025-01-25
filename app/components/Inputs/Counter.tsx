"use cleint";

import { useCallback } from "react";
import { AiOutlineCompass, AiOutlineMinus, AiOutlinePlus } from "react-icons/ai";

interface CounterProps {
    title: string;
    subtitle: string;  
    value: number;
    onChnage: (value: number) => void;
}

const Counter: React.FC<CounterProps> = ({
    title,
    subtitle,
    value,
    onChnage
}) => {
    const onAdd = useCallback(() => {
        onChnage(value + 1);
    }, [onChnage, value]);

    const onSubtract = useCallback(() => {
        if (value === 1) return;
        onChnage(value - 1);
    }, [onChnage, value]);

    return (
        <div className="flex flex-row justify-between">
            <div className="flex flex-col">
                <div className="font-medium">
                    {title}
                </div>
                <div className="font-light text-grey-600">
                    {subtitle}
                </div>
            </div>
            <div className="flex items-center flex-row gap-4">
                <div 
                onClick={onSubtract} 
                className="
                    w-10 
                    h-10
                    rounded-full
                    border[1px]
                    border-nuetral-400
                    flex
                    items-center
                    justify-center
                    text-nuetral-600
                    cursor-pointer
                    transition
                    hover:opacity-80
                "
                >
                    <AiOutlineMinus/>
                </div>
                <div className="font-light text-xl text-nuteral-600">
                    {value}
                </div>
                <div 
                onClick={onAdd} 
                className="
                    w-10 
                    h-10
                    rounded-full
                    border[1px]
                    border-nuetral-400
                    flex
                    items-center
                    justify-center
                    text-nuetral-600
                    cursor-pointer
                    transition
                    hover:opacity-80
                "
                >
                    <AiOutlinePlus/>
                </div>
            </div>
        </div>
    )
};

export default Counter;