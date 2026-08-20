import Button from '@atlaskit/button/new';
import Heading from '@atlaskit/heading';
import { Box, Stack, Text } from '@atlaskit/primitives/compiled';
import React from 'react';

export function ProofPage(): React.JSX.Element {
  return (
    <Box as="main" backgroundColor="elevation.surface" padding="space.400">
      <Stack alignInline="start" space="space.300">
        <Heading as="h1" size="xlarge">
          PACE
        </Heading>
        <Text as="p">Your personal running coach.</Text>
        <Button appearance="primary">Start</Button>
      </Stack>
    </Box>
  );
}
