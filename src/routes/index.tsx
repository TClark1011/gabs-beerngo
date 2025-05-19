import { BeerInfoModal } from '@/components/beer-info-modal';
import { BeerList } from '@/components/beer-list';
import { Board } from '@/components/board';
import { OptionsDrawer } from '@/components/options-drawer';
import { Paddle } from '@/components/paddle';
import { availableBeersAtom, beerIdIsCheckedAtom, beerIdIsInPaddleAtom, bingoBoardSectionAtom, paddleBeerIdsAtom, toggleBeerIdInPaddleAtom } from '@/stores';
import { Center } from '@chakra-ui/react';
import { createFileRoute } from '@tanstack/react-router';
import { useAtomValue, useSetAtom } from 'jotai';
import { FC } from 'react';

const MainPage: FC = () => {
  const availableBeers = useAtomValue(availableBeersAtom);
  const section = useAtomValue(bingoBoardSectionAtom);
  const paddleBeerIds = useAtomValue(paddleBeerIdsAtom);
  const togglePaddleBeerId = useSetAtom(toggleBeerIdInPaddleAtom);
  return (
    <>
      <Center mb="4">
        <Board />
      </Center>
      <Paddle beerIds={paddleBeerIds} onToggle={togglePaddleBeerId} />
      <BeerList beers={availableBeers} section={section} checkedAtomComposer={beerIdIsCheckedAtom} inPaddleAtomComposer={beerIdIsInPaddleAtom} showPaddleButton />
      <OptionsDrawer />
      <BeerInfoModal />
    </>
  );
};

export const Route = createFileRoute('/')({
  component: MainPage
});
