import z from "zod";

const characterSchema = z.object({
  name: z.string({
    required_error: "Name is required",
    invalid_type_error: "Name Must be a string",
  }),
  role: z.string().optional(),
  species: z.string({
    required_error: "Species is required",
    invalid_type_error: "Species must be a string",
  }),
  gender: z.string({
    required_error: "Gender is required",
    invalid_type_error: "Gender must be a string",
  }),
  image: z.string().url({
    invalid_type_error: "Image must be an url",
  }),
  episode: z.array(z.string().url()).optional(),
  location: z
    .object({
      name: z.string(),
      url: z.string().url(),
    })
    .optional(),
});

export default function validateCharacter(object) {
  return characterSchema.safeParse(object);
}
