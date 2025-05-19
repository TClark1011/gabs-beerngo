import { BeerReview } from '@/types';
import { getBeerWithIdOrThrow } from '@/utils/bingo-helpers';
import { Box, Card, CardBody, Center, Divider, Flex, Heading, Stack, Text } from '@chakra-ui/react';
import { FC, useMemo } from 'react';

export const ReviewCard: FC<{
  review: BeerReview;
}> = ({ review }) => {
  const beer = useMemo(() => getBeerWithIdOrThrow(review.beerId), [review.beerId]);

  return (
    <Card>
      <CardBody>
        <Flex justifyContent="space-between" alignItems="center">
          <Heading size="sm">
            {beer.id}. {beer.name}
          </Heading>
          <Center boxSize={8} borderWidth={1} borderRadius="100%">
            {review.score}
          </Center>
        </Flex>
        <Stack>
          <Box>
            <Text fontWeight="bold">Flavour:</Text>
            <Text>{beer.flavour}</Text>
          </Box>
          <Box>
            <Text fontWeight="bold">Brewery:</Text>
            <Text>{beer.company}</Text>
          </Box>
          <Box>
            <Text fontWeight="bold">State:</Text>
            <Text>{beer.state}</Text>
          </Box>
        </Stack>
        {review.note && <Divider my="4" />}
        <Text>{review.note}</Text>
      </CardBody>
    </Card>
  );
};
