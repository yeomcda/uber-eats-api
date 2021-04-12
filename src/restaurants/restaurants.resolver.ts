import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { CreateRestaurantDto } from './dtos/create-restaurant.dto';
import { Restaurant } from './entities/restaurant.entity';
import { RestaurantServiece } from './restaurants.service';

@Resolver((of) => Restaurant)
export class RestaurantsResolver {
  constructor(private readonly restaurantService: RestaurantServiece) {}

  @Query((returns) => [Restaurant])
  restaurants(@Args('veganOnly') veganOnly: boolean): Promise<Restaurant[]> {
    return this.restaurantService.getAll();
  }

  @Mutation((returns) => Boolean)
  async createdRestaurant(
    @Args('input') createRestaurantDto: CreateRestaurantDto,
  ): Promise<boolean> {
    try {
      await this.restaurantService.createRestaurant(createRestaurantDto);
      return true;
    } catch (e) {
      console.log(e);
      return false;
    }
  }
}
