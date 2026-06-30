export interface EnvConfig {
  USERS_TABLE: string;
  COURTS_TABLE: string;
  BOOKINGS_TABLE: string;
  JWT_SECRET: string;
  JWT_EXPIRY: string;
  CORS_ORIGIN: string;
  API_BASE_URL: string;
  NODE_ENV: string;
}

export interface UserItem {
  PK: string;
  SK: string;
  entityType: 'USER';
  userId: string;
  email: string;
  name: string;
  passwordHash: string;
  role: 'user' | 'admin';
  phone?: string;
  createdAt: string;
  updatedAt: string;
}

export interface CourtItem {
  PK: string;
  SK: string;
  entityType: 'COURT';
  courtId: string;
  name: string;
  type: string;
  pricePerHour: number;
  surface: string;
  available: boolean;
  createdAt: string;
}

export interface BookingItem {
  PK: string;
  SK: string;
  entityType: 'BOOKING';
  bookingId: string;
  userId: string;
  courtId: string;
  courtName: string;
  date: string;
  startTime: string;
  endTime: string;
  durationHours: number;
  amount: number;
  status: 'pending' | 'confirmed' | 'cancelled';
  createdAt: string;
}

export interface ApiResponse<T = unknown> {
  statusCode: number;
  headers: Record<string, string>;
  body: string;
}

export interface AuthenticatedEvent {
  requestContext?: {
    authorizer?: {
      userId?: string;
      role?: string;
      email?: string;
    };
  };
  headers?: Record<string, string>;
  cookies?: string[];
}
