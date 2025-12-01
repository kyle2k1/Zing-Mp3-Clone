import { Body, Container, Head, Heading, Html, Img, Tailwind, Text } from '@react-email/components';

const LOGO_URL =
  'https://raw.githubusercontent.com/bmo4401/sharing-image/24c12892643f585dbd22d5b525c4f94ddccb6a6f/bmo1.png';

const template = (otp: number) => {
  return (
    <Html>
      <Tailwind>
        <Head />
        <Body className="bg-gray-50 font-sans">
          <Container className="mx-auto mt-8 flex w-full flex-col items-center rounded-lg border border-gray-200 bg-white p-8 shadow-md">
            <Img src={`${LOGO_URL}`} width={88} height={88} alt="" className="m-auto" />
            <Text className="mb-2 text-center text-xs font-bold uppercase tracking-wide text-blue-500">
              Verify Your Identity
            </Text>
            <Heading className="mb-4 text-center text-2xl font-medium text-gray-800">
              Enter the following code to verify your identity.
            </Heading>
            <Text className="mb-6 w-full rounded-md bg-gray-100 py-6 text-center text-4xl font-bold tracking-wide text-gray-800">
              {otp}
            </Text>
            <Text className="text-center text-base font-normal leading-6 text-gray-600">
              If you did not request this code, please disregard this message.
            </Text>
          </Container>
        </Body>
      </Tailwind>
    </Html>
  );
};

export default template;
