# Issue Description:

I'm trying to create a function that given a TFunction (returned from `useTranslations` or `getTranslations`) as a parameter would use it to get translations and output some translated texts. The problem is that Typescript does not seem to enforce correctly the type-safety of this parameter.

Here's an example:
```
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
```

Am I missing something? Should the t function type be inferred in a different way?
