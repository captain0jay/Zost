import { Input } from '@/components/ui/input'
import React from 'react'
import {
  ToggleGroup,
  ToggleGroupItem,
} from "@/components/ui/toggle-group"
import { AppWindow, ArrowUpRight, Expand, Monitor, RefreshCw, Smartphone, TabletSmartphone } from 'lucide-react'
import { Separator } from '@/components/ui/separator'
import { Toggle } from '@/components/ui/toggle'
import ThreeDotIcon from './Threedoticon'
import { Button } from '@/components/ui/button'
import {
    Sheet,
    SheetContent,
    SheetDescription,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
  } from "@/components/ui/sheet"
import SidebarContent from './SidebarContent'
  
export default function Toolbar() {
  return (
    <div className='w-full h-full'>
        <div className="w-full h-full rounded-xl">
            <div className="grid grid-cols-10 gap-2 h-full">
                {/* the url part */}
                <div className="col-span-5">
                    <div className="w-full h-full rounded-xl">
                        <div className='w-full h-full flex border border-gray-300 rounded-lg'>
                            <div className='p-2 pl-4 flex justify-center items-center text-sm pr-0'>https:/localhost:3000/</div>
                            <Input placeholder="example_path" className='w-full h-full border border-gray-300 focus:border-gray-300 border-x-0 border-y-0 pl-0'/>
                        </div>
                    </div>
                </div>
                {/* the rest */}
                <div className="col-span-5">
                    <div className="w-full h-full rounded-xl flex gap-2">
                        <div className='border border-gray-200 rounded-lg flex'>
                        <ToggleGroup size={"sm"} type="single">
                            <ToggleGroupItem value="large" aria-label="Toggle large">
                                <Monitor className="h-4 w-4" />
                            </ToggleGroupItem>
                            <ToggleGroupItem value="medium" aria-label="Toggle medium">
                                <TabletSmartphone className="h-4 w-4" />
                            </ToggleGroupItem>
                            <ToggleGroupItem value="small" aria-label="Toggle small">
                                <Smartphone className="h-4 w-4" />
                            </ToggleGroupItem>
                        </ToggleGroup>
                        <Separator orientation="vertical" />
                        <Toggle size="sm" aria-label="Toggle italic">
                            <Expand className="h-4 w-4" />
                        </Toggle>
                        <Separator orientation="vertical" />
                        <Toggle size="sm" aria-label="Toggle italic">
                            <RefreshCw className="h-4 w-4" />
                        </Toggle>
                        <Separator orientation="vertical" />
                        <Toggle size="sm" aria-label="Toggle italic">
                            <ArrowUpRight className="h-4 w-4" />
                        </Toggle>
                        </div>

                        <div className='border border-gray-200 rounded-lg flex p-2'>
                            <ThreeDotIcon width={20} height={20} fill="black" />
                        </div>
                        
                        <div className='border border-gray-200 rounded-lg flex'>
                        <Toggle size="sm" aria-label="Toggle italic">
                            <AppWindow className="h-4 w-4"/>
                        </Toggle>
                        </div>

                        <div className='w-full flex justify-end h-[30px]'>
                            <Sheet>
                            <SheetTrigger className="bg-gray-900 text-white rounded-full w-[100px] p-0 h-[35px]">Menu</SheetTrigger>
                            <SheetContent className='p-0'>
                                <SidebarContent/>
                            </SheetContent>
                            </Sheet>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
  )
}
