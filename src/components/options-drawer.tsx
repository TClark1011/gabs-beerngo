import { useAtom, useSetAtom } from 'jotai';
import { FC, useDeferredValue } from 'react';
import { beerIdHasBeenPlayedAtom, beerIdIsInPaddleAtom, beerSearchAtom, optionsDrawerIsOpenAtom, regenerateBoardAtom } from '@/stores';
import { Box, Button, Divider, Drawer, DrawerBody, DrawerCloseButton, DrawerContent, DrawerHeader, DrawerOverlay, Flex, Input, Text } from '@chakra-ui/react';
import { BeerList } from '@/components/beer-list';

export const OptionsDrawer: FC = () => {
  const [isOpen, setIsOpen] = useAtom(optionsDrawerIsOpenAtom);

  const [search, setSearch] = useAtom(beerSearchAtom);
  const deferredSearch = useDeferredValue(search);

  const generateNewBoard = useSetAtom(regenerateBoardAtom);

  return (
    <Drawer
      isOpen={isOpen}
      placement="bottom"
      onClose={() => {
        setIsOpen(false);
        setSearch('');
      }}
      preserveScrollBarGap={false}
    >
      <DrawerOverlay />
      <DrawerContent h="90vh">
        <DrawerCloseButton />
        <DrawerHeader>Options</DrawerHeader>
        <DrawerBody>
          <Flex gap={2} wrap="wrap">
            <Button
              onClick={() => {
                if (window.confirm('WARNING: This will reset all data, it cannot be undone. Are you sure?')) {
                  localStorage.clear();
                  window.location.reload();
                }
              }}
              colorScheme="red"
            >
              Reset Data
            </Button>
            <Button
              onClick={() => {
                if (window.confirm('Are you sure you want to generate a new board?')) {
                  generateNewBoard();
                }
              }}
            >
              Get New Board
            </Button>
          </Flex>
          <Divider my="8" />
          <Text fontWeight="bold" mb="4">
            Played Beers
          </Text>
          <Input variant="filled" placeholder="Search..." value={search} onChange={(e) => setSearch(e.target.value)} />
          <Box h="8" />
          <BeerList checkedAtomComposer={beerIdHasBeenPlayedAtom} searchQuery={deferredSearch} inPaddleAtomComposer={beerIdIsInPaddleAtom} />
        </DrawerBody>
      </DrawerContent>
    </Drawer>
  );
};
