import { Resolver, Authorized, Mutation, Ctx, Arg } from "type-graphql";
import { Location } from "../../../dal/entity/location";
import { IMyContext } from "../context.interface";
import { verify } from "jsonwebtoken";
import { ACCESS_TOKEN_SECRET } from "./authenticationResolver";
import { loadFaceDetectionModel } from "face-api.js";
import { UserLocation } from "../../../dal/entity/userLocation";

@Resolver()
export class UserLocationResolver {

    @Authorized()
    @Mutation()
    public async addNewUserLocation(
        @Arg("locationName") locationName: string,
        @Ctx() ctx: IMyContext
    ): Promise<UserLocation> {
        try {
            const accessToken = ctx.req.cookies["access-token"];
            const data = verify(accessToken, ACCESS_TOKEN_SECRET) as any;

            const location = await Location.create({ name: locationName }).save();
            const userLocation = await UserLocation.create({
                userId: data.userId,
                locationId: location.id
            }).save();

            return userLocation;
        } catch (error) {
            console.error(error);
        }
    }

}