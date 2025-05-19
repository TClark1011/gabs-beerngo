import { BeerInfoModal } from '@/components/beer-info-modal';
import { BeerList } from '@/components/beer-list';
import { Board } from '@/components/board';
import { OptionsDrawer } from '@/components/options-drawer';
import { availableBeersAtom, beerIdIsCheckedAtom, bingoBoardSectionAtom } from '@/stores';
import { Center } from '@chakra-ui/react';
import { createFileRoute } from '@tanstack/react-router';
import { useAtomValue } from 'jotai';
import { FC } from 'react';

const MainPage: FC = () => {
  const availableBeers = useAtomValue(availableBeersAtom);
  const section = useAtomValue(bingoBoardSectionAtom);
  return (
    <>
      <Center mb="4">
        <Board />
      </Center>
      <BeerList beers={availableBeers} section={section} checkedAtomComposer={beerIdIsCheckedAtom} />
      <OptionsDrawer />
      <BeerInfoModal />
    </>
  );
};

export const Route = createFileRoute('/')({
  component: MainPage
});
