
import * as React from "react"

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"

import { Button } from "@/components/ui/button"


const ButtonList = () => {
  const buttonList = ["All" , "Music" , "Mixes" , "News" , "Podcasts" , "History World Tour" , "T-Series" , "Live" , "Movie musicals" , "1990s" , " Street dances" , "Dramedy" , "Ai" , "Soul Music" , " Indian pop Music" , "Cricket" , "Body-Building" , "Recently Uploaded" , " Watched"  , "New To You"]
  return (
    <div className="mb-4">
 <Carousel className="w-full max-w-[1480px]">
      <CarouselContent>
        {buttonList.map((obj, index) => (
          <CarouselItem className="basis-auto mr-2" key={index}>
            <div >
                  <Button className=" cursor-pointer whitespace-nowrap" variant="outline">{obj}</Button>
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
     
    </Carousel>
  
    </div>
  )
}

export default ButtonList