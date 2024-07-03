"use client"
import React, { Suspense, lazy } from 'react';
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { AlignJustify, Expand, Settings } from 'lucide-react';
import { Separator } from '@/components/ui/separator';
import { useGlobalState } from './StateProvider';
import { ScrollArea } from "@/components/ui/scroll-area"

// Helper function to dynamically import the Config component
const getConfigComponent = (state: string) => {
  const pathArray = state.split('/');
  let importPath = './(main)';
  if (pathArray.length > 1) {
    importPath += `/${pathArray[1]}`;
  }
  return lazy(() => import(`${importPath}/Config`));
};

export default function ConfigSection() {
  const { state, setState } = useGlobalState();

  // Convert state string to an array
  const stateArray = state.split('/');

  const handleBreadcrumbClick = (index: number) => {
    // Rebuild the state string based on the clicked breadcrumb
    const newState = stateArray.slice(0, index + 1).join('/');
    setState(newState);
  };

  // Dynamically import the Config component based on the state
  const ConfigComponent = getConfigComponent(state);

  return (
    <div className="w-full h-full flex flex-col">
      <div className='w-full h-[35px] rounded-t-lg border border-x-0 border-t-gray-50 border-gray-300 flex text-sm justify-between items-center p-2 pl-4'>
        <div className='flex items-center h-full'>
          <Breadcrumb>
            <BreadcrumbList className="flex items-center">
              {stateArray.map((item, index) => (
                <React.Fragment key={index}>
                  <BreadcrumbItem>
                    {index === stateArray.length - 1 ? (
                      <BreadcrumbPage>{item}</BreadcrumbPage>
                    ) : (
                      <BreadcrumbLink onClick={() => handleBreadcrumbClick(index)}>
                        {item}
                      </BreadcrumbLink>
                    )}
                  </BreadcrumbItem>
                  {index < stateArray.length - 1 && <BreadcrumbSeparator />}
                </React.Fragment>
              ))}
            </BreadcrumbList>
          </Breadcrumb>
        </div>
        <div className="flex items-center gap-1 h-full">
          <div className='flex items-center gap-2 pr-2 h-full'>
            <Settings className="h-5 w-5"/>
            <Separator orientation="vertical" />
            <Expand className="h-5 w-5" />
            <Separator orientation="vertical" />
            <AlignJustify className="h-5 w-5" />
          </div>
        </div>
      </div>
      <div className='w-full flex-1 flex flex-col'>
        <div className='flex-1 p-2'>
          {/* Dynamically render the Config component */}
          <Suspense fallback={<div className='w-full h-full flex justify-center items-center italic'>Loading...</div>}>
          <ScrollArea className="w-full h-full">
            <ConfigComponent />
          </ScrollArea>
          </Suspense>
        </div>
        <div className='w-full h-12 p-2 px-8'>
          <div className='w-full h-full rounded-full bg-gray-900'></div>
        </div>
      </div>
    </div>
  );
}
