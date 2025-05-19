import { Button, Card, CardBody, HStack, Icon } from '@chakra-ui/react';
import { FC, useMemo } from 'react';
import { PADDLE_SIZE } from '@/constants/data';
import { fillToSize } from '@/utils/misc';

export const Paddle: FC<{
  beerIds: number[];
  onToggle: (beerId: number) => void;
}> = ({ beerIds, onToggle }) => {
  const slots = useMemo(() => fillToSize(beerIds, PADDLE_SIZE, undefined), [beerIds]);
  return (
    <Card bg="whiteAlpha.200" mb="2">
      <CardBody>
        <HStack justifyContent="space-between">
          {slots.map((beerId, index) => (
            <Button
              boxSize={20}
              rounded="full"
              key={beerId ?? index}
              onClick={() => {
                if (beerId) {
                  onToggle(beerId);
                }
              }}
              fontSize="xl"
            >
              {beerId ?? (
                <Icon viewBox="0 0 20 20" color="whiteAlpha.400">
                  {/* Empty Circle */}
                  <circle cx="10" cy="10" r="8" stroke="currentColor" fill="transparent" strokeWidth="2px" />
                </Icon>
              )}
            </Button>
          ))}
        </HStack>
      </CardBody>
    </Card>
  );
};
