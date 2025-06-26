import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class AuthedResponse {
  @ApiProperty()
  accessToken: string;

  @ApiProperty()
  firstName: string;

  @ApiProperty()
  lastName: string;

  @ApiProperty()
  email: string;

  @ApiPropertyOptional()
  refreshToken?: string;

  @ApiPropertyOptional()
  message?: string;
}
