import { BEERS } from '@/constants/data';
import { infoModalTargetBeerIdAtom } from '@/stores';
import { Beer } from '@/types';
import { matchesSearchQuery } from '@/utils/misc';
import { AddIcon, InfoIcon } from '@chakra-ui/icons';
import { Button, Card, CardBody, Checkbox, Divider, Flex, HStack, IconButton, Stack, Text, useColorModeValue } from '@chakra-ui/react';
import { useAtom, useSetAtom } from 'jotai';
import { WritableAtom } from 'jotai';
import { FC, memo, useMemo } from 'react';

const BeerRow: FC<{
  beer: Beer;
  checkedAtomComposer: (id: number) => WritableAtom<boolean, [boolean], void>;
  inPaddleAtomComposer: (id: number) => WritableAtom<boolean, [boolean], void>;
  withPaddleButton: boolean;
}> = ({ beer, checkedAtomComposer, inPaddleAtomComposer, withPaddleButton }) => {
  const openInfoModalForId = useSetAtom(infoModalTargetBeerIdAtom);
  const hasBeenPlayedAtom = useMemo(() => checkedAtomComposer(beer.id), [beer.id, checkedAtomComposer]);
  const [hasBeenPlayed, setHasBeenPlayed] = useAtom(hasBeenPlayedAtom);
  const [inPaddle, setInPaddle] = useAtom(inPaddleAtomComposer(beer.id));

  const checkboxBorderColor = useColorModeValue('gray.300', 'gray.500');

  return (
    <Flex w="full" alignItems="center" gap="2">
      <Button
        onClick={() => {
          setHasBeenPlayed(!hasBeenPlayed);
        }}
        textAlign="left"
        justifyContent="flex-start"
        size="lg"
        whiteSpace="normal"
        h="max-content"
        py="4"
        px="4"
        gap="2"
        flexGrow={1}
      >
        <Checkbox borderColor={checkboxBorderColor} isChecked={hasBeenPlayed} pointerEvents="none" tabIndex={-1} flexShrink={0} />
        <Text flexGrow={1}>
          {beer.id}. {beer.name}
        </Text>
      </Button>
      <IconButton
        aria-label="View Beer Info"
        icon={<InfoIcon />}
        onClick={() => {
          openInfoModalForId(beer.id);
        }}
        py="4"
        isRound
        variant="outline"
      />
      {withPaddleButton && (
        <IconButton
          aria-label="Add To Paddle"
          icon={<AddIcon />}
          onClick={() => {
            setInPaddle(true);
          }}
          py="4"
          isRound
          variant="outline"
          disabled={inPaddle}
        />
      )}
    </Flex>
  );
};

export const BeerList: FC<{
  searchQuery?: string;
  checkedAtomComposer: (id: number) => WritableAtom<boolean, [boolean], void>;
  inPaddleAtomComposer: (id: number) => WritableAtom<boolean, [boolean], void>;
  showPaddleButton?: boolean;
  beers?: Beer[];
  section?: number;
}> = memo(({ searchQuery, checkedAtomComposer, beers = BEERS, section, inPaddleAtomComposer, showPaddleButton = false }) => {
  const filteredBeers = useMemo(() => {
    if (!searchQuery) {
      return beers;
    }

    return beers.filter((beer) =>
      matchesSearchQuery({
        query: searchQuery,
        target: beer.name
      })
    );
  }, [searchQuery, beers]);

  const sortedAndFilteredBeers = useMemo(() => {
    return [...filteredBeers].sort((a, b) => a.id - b.id);
  }, [filteredBeers]);

  return (
    <Stack divider={<Divider />}>
      {!!section && (
        <Card bg="whiteAlpha.200">
          <CardBody>
            <HStack>
              <Text fontWeight="bold">Section</Text>
              <Text>{section}</Text>
            </HStack>
          </CardBody>
        </Card>
      )}
      <Stack gap="4">
        {sortedAndFilteredBeers.map((beer) => (
          <BeerRow withPaddleButton={showPaddleButton} inPaddleAtomComposer={inPaddleAtomComposer} checkedAtomComposer={checkedAtomComposer} beer={beer} key={beer.id} />
        ))}
      </Stack>
    </Stack>
  );
});
