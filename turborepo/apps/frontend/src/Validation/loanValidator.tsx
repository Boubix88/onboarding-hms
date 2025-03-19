import * as yup from "yup";

export const schemaLoan = yup.object().shape({
    bien: yup.string()
        .required("Le type de bien est requis")
        .matches(/^(Maison|Appartement|Travaux|Autres)$/, "Le type de bien doit être Maison, Appartement, Travaux ou Autres"),
        autreBien: yup.string()
        .when("bien", {
            is: "Autres",
            then: (schema) => schema
                .required("Le type de bien est requis")
                .min(3, "Le type de bien doit être au moins de 3 caractères")
                .max(20, "Le type de bien doit être au maximum de 20 caractères")
                .matches(/^[a-zA-Z0-9 ]*$/, "Le type de bien doit être alphanumérique"),
            otherwise: (schema) => schema.notRequired()
        }),
    montant: yup.number()
        .required("Le montant est requis")
        .min(10000, "Le montant doit être au moins de 10 000 €")
        .max(1000000, "Le montant doit être au maximum de 1 000 000 €")
        .transform((value, originalValue) => originalValue === "" ? undefined : value),
    taux: yup.number()
        .required("Le taux d'intérêt est requis")
        .min(0.6, "Le taux d'intérêt doit être au moins de 0.6%")
        .max(4, "Le taux d'intérêt doit être au maximum de 4%")
        .transform((value, originalValue) => originalValue === "" ? undefined : value),
    duree: yup.number()
        .required("La durée est requise")
        .min(5, "La durée doit être au moins de 5 ans")
        .max(20, "La durée doit être au maximum de 20 ans")
        .transform((value, originalValue) => originalValue === "" ? undefined : value),
});