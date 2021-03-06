import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { TypeOrmModule } from '@nestjs/typeorm'

import { AuthModule } from './modules/auth/auth.module'
import { FavoriteModule } from './modules/favorite/favorite.module'
import { SubjectModule } from './modules/subject/subject.module'
import { TimeModule } from './modules/time/time.module'
import { UserModule } from './modules/user/user.module'

@Module({
    imports: [
        UserModule,
        SubjectModule,
        TimeModule,
        FavoriteModule,
        AuthModule,
        TypeOrmModule.forRoot(),
        ConfigModule.forRoot({
            envFilePath: '.env'
        })
    ]
})
export class AppModule {}
