import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Inject } from '@nestjs/common/decorators';
import { Reflector } from '@nestjs/core';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class PermissionGuard implements CanActivate {
  constructor(@Inject(PrismaService) private readonly prisma: PrismaService) {}

  canActivate(ctx: ExecutionContext): Promise<boolean> | boolean {
    const req = ctx.switchToHttp().getRequest();
    return this.prisma.permission
      .findMany({
        where: {
          Operator: req.user.id,
          User: Number(req.params.id),
        },
        select: {
          User: true,
        },
      })

      .then((e) => e.length !== 0);
  }
}
