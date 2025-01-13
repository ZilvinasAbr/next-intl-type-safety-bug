import {useTranslations} from 'next-intl';

export default function IndexPage() {
  const t = useTranslations(); // Define generic `t` function
  const tGeneral = useTranslations("general"); // Define a `t` function scoped to the `general` subkey.
  const tAnother = useTranslations("another"); // Another example with subkey

  type TGeneralFunc = ReturnType<typeof useTranslations<"general">>; // Define the type for this `t` function by inferring the `useTranslations` return value with `general` passed as the parameter.

  // Here's an example function using the `t` function as parameter
  const randomFunction = (t: TGeneralFunc) => {
    return { text: t("testKey") };
  };

  randomFunction(tGeneral); // This is how it should be used: it should allow only the `tGeneral` to be passed
  randomFunction(t); // Sadly, this doesn't throw any typescript errors, you can freely pass the `t` function that is without a subkey
  randomFunction(tAnother); // No Typescript error in this case also
  
  return <h1>{t('title')}</h1>;
}
