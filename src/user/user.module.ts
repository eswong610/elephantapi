import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { UserSchema } from './schemas/user.schema';
import { RatingSchema } from '../educator-rating/schemas/rating.schema';

import { MongooseModule } from '@nestjs/mongoose';
import * as bcrypt from 'bcrypt';
import { EducatorRatingService } from 'src/educator-rating/educator-rating.service';
// import { EducatorRatingModule } from 'src/educator-rating/educator-rating.module';
import { EducatorRatingModule } from '../educator-rating/educator-rating.module'

@Module({
  // imports: [MongooseModule.forFeature([{name: "User", schema: UserSchema}]), EducatorRatingModule],
  imports: [MongooseModule.forFeatureAsync([
      {
          name: "User", 
          useFactory: () => {
            const schema = UserSchema;
            schema.pre('save', async function (next){
                var user = this;
                const saltRounds = 10; // What you want number for round paasword
                const salt = await bcrypt.genSaltSync(saltRounds);
                const hash = await bcrypt.hash(user.password, salt);
                user.password = hash;
                // bcrypt.genSalt(saltRounds, function(err, salt) {
                //     if(err) return next(err);
                //     bcrypt.hash(user.password, salt, function(err, hash) {
                //         if (err) return next(err);
                //         // Store hash in your password DB.
                //         console.log(hash)
                //         user.password = hash;
                //         console.log(this.password)
                //         // return next(user);
                //     });
                // });
                
            });
            return schema;
            
          },
      }
    ]), EducatorRatingModule],
  controllers: [UserController],
  providers: [UserService],
  exports: [UserService]
})
export class UserModule {}