import { Query, Resolver } from "type-graphql";
import { Image } from "../../../dal/entity/image";

@Resolver()
export class ImageResolver {

    @Query((type) => [Image])
    public async getAllImages(): Promise<Image[]> {
        try {
            return await Image.find();
        } catch (error) {
            console.error(error);
        }
    }
}
