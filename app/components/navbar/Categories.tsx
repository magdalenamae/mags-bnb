'use client';

import Container from '../Container'
import CategoryBox from '../CategoryBox'

import { usePathname, useSearchParams } from 'next/navigation';
import { TbBeach, TbMountain, TbPool } from 'react-icons/tb'
import { 
    GiWindmill, 
    GiIsland, 
    GiBoatFishing, 
    GiCastle, 
    GiForestCamp, 
    GiCaveEntrance, 
    GiCactus, 
    GiBarn 
} from 'react-icons/gi'
import { MdOutlineVilla } from 'react-icons/md'
import { FaSkiing } from 'react-icons/fa';
import { BsSnow } from 'react-icons/bs';
import { IoDiamond } from 'react-icons/io5';

export const catergories = [
    {
        label : "Beach",
        icon: TbBeach,
        description: "Beautiful beach houses"
    },
    {
        label : "Mountain",
        icon: TbMountain,
        description: "Beautiful mountain houses"
    },
    {
        label : "City",
        icon: MdOutlineVilla,
        description: "Beautiful city houses"
    },
    {
        label : "Countryside",
        icon: GiWindmill,
        description: "Beautiful countryside houses"
    },
    {
        label : "Pool",
        icon: TbPool,
        description: "Beautiful pool houses"
    },
    {
        label : "Island",
        icon: GiIsland,
        description: "Beautiful island houses"
    },
    {
        label : "Lake",
        icon: GiBoatFishing,
        description: "This is a lake house"
    },
    {
        label : "Skiking",
        icon: FaSkiing,
        description: "This is a skiking house"
    },
    {
        label: "Castle",
        icon: GiCastle,   
        description: "This is a castle house"
    },
    {
        label: "Camping",
        icon: GiForestCamp,
        description: "This is a camping house"
    },
    {
        label: "Artic",
        icon: BsSnow,
        description: "This is an artic house"
    },
    {
        label: "Cave",
        icon: GiCaveEntrance,
        description: "This is a cave house"
    },
    {
        label: "Desert",
        icon: GiCactus,
        description: "This is a cave house"
    },
    {
        label: "Barn",
        icon: GiBarn,
        description: "This is a barn house"
    },
    {
        label: "Luxury",
        icon: IoDiamond,
        description: "This is a luxury house"
    }
]

const Catergories = () => {
    const params = useSearchParams();
    const category = params?.get('category');
    const pathname = usePathname();

    const isMainPage = pathname === '/';

    if (!isMainPage) {
        return null;
    }

    
    return (
           <Container>
               <div className='flex flex-row pt-4 items-center justify-between overflow-x-auto'>
                   {catergories.map((item) => (
                    <CategoryBox 
                        key={item.label} 
                        label={item.label}
                        selected={category === item.label}
                        icon={item.icon} 
                    />
                   ))}
               </div>
              </Container>
    )
}

export default Catergories