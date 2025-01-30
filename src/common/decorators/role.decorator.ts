import { SetMetadata } from '@nestjs/common';
import { Role } from '../constants/role.constant';

export const Roles = (role: Role | Role[]) => SetMetadata('role', role);
