import React from 'react';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Download, FileSliders, PlaneLanding, Key, PanelTop,PanelsTopLeft, LayoutPanelTop, ScreenShare, BookMarked, FileLock2, Cog, ShoppingBag,Cuboid,Container,BrickWall,Palette,SquareLibrary,Pickaxe} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useGlobalState } from '../StateProvider';

// Sample JSON array
const configArray = [
  { name: 'Install', render: 'button', value: 'home/install', icon: Download },
  {
    name: 'Configuration',
    render: 'accordion',
    value: 'home/configuration',
    array: [
      { name: 'Landing page', render: 'button', value: 'home/configuration/landingpage', icon: PlaneLanding },
      { name: 'Authentication', render: 'button', value: 'home/configuration/authentication', icon: Key },
      { name: 'Navbar', render: 'button', value: 'home/configuration/navbar', icon: PanelTop },
      { name: 'Sidebar', render: 'button', value: 'home/configuration/sidebar', icon: PanelsTopLeft },
      { name: 'Mainapp', render: 'button', value: 'home/configuration/mainapp', icon: LayoutPanelTop },
    ],
    icon: FileSliders,
  },
  {
    name: 'Settings',
    render: 'accordion',
    value: 'home/settings',
    array: [
      { name: 'Connect with zost website', render: 'button', value: 'home/settings/zostwebsite', icon: ScreenShare },
      { name: 'Github connection', render: 'button', value: 'home/settings/github', icon: BookMarked },
      { name: 'ENV variables', render: 'button', value: 'home/settings/env', icon: FileLock2 },
    ],
    icon: Cog,
  },
  {
    name: 'Stores',
    render: 'accordion',
    value: 'home/stores',
    array: [
      { name: 'Component store', render: 'button', value: 'home/settings/components', icon: Cuboid },
      { name: 'Template store', render: 'button', value: 'home/settings/templates', icon: Container },
      { name: 'Pages store', render: 'button', value: 'home/settings/pages', icon: BrickWall },
      { name: 'Themes store', render: 'button', value: 'home/settings/themes', icon: Palette },
    ],
    icon: ShoppingBag,
  },
  {
    name: 'Component libraries',
    render: 'accordion',
    value: 'home/clibraries',
    array: [
      { name: 'shadcn ui', render: 'button', value: 'home/settings/shadcnui', icon: Cuboid },
      { name: 'next ui', render: 'button', value: 'home/settings/nextui', icon: Container },
      { name: 'acternity ui', render: 'button', value: 'home/settings/acternityui', icon: BrickWall },
      { name: 'daisy ui', render: 'button', value: 'home/settings/daisyui', icon: Palette },
    ],
    icon: SquareLibrary,
  },
  {
    name: 'Other configurations',
    render: 'accordion',
    value: 'home/others',
    array: [
      { name: 'svg', render: 'button', value: 'home/settings/svg', icon: Cuboid },
      { name: 'fonts', render: 'button', value: 'home/settings/fonts', icon: Container }
    ],
    icon: Pickaxe,
  },
];

// Helper function to render components based on the JSON array
const renderComponents = (config: any[], setState: (value: string) => void) => {
  return config.map((item, index) => {
    if (item.render === 'button') {
      const Icon = item.icon;
      return (
        <Button
          key={index}
          className='w-full justify-start gap-2 border-0'
          variant="outline"
          onClick={() => setState(item.value)}
        >
          <Icon className='w-5 h-5' />
          {item.name}
        </Button>
      );
    } else if (item.render === 'accordion') {
      const Icon = item.icon;
      return (
        <Accordion type="single" collapsible className='w-full' key={index}>
          <AccordionItem value={`item-${index}`}>
            <AccordionTrigger className='ml-2'>
              <div className='flex gap-4 items-center'>
                <Icon className='w-5 h-5' />
                {item.name}
              </div>
            </AccordionTrigger>
            <AccordionContent>
              <div className='p-2 flex flex-col gap-2'>
                {renderComponents(item.array, setState)}
              </div>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      );
    }
    return null;
  });
};

export default function Config() {
  const { setState } = useGlobalState();

  return (
    <div className='w-full h-full p-2 flex flex-col gap-2'>
      {renderComponents(configArray, setState)}
    </div>
  );
}
