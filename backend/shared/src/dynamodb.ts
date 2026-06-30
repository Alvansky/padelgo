import { DynamoDBDocumentClient, PutCommand, GetCommand, QueryCommand, ScanCommand, DeleteCommand, UpdateCommand } from "@aws-sdk/lib-dynamodb";
import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { UserItem, CourtItem, BookingItem, EnvConfig } from "./types.js";

const client = new DynamoDBClient({});
export const docClient = DynamoDBDocumentClient.from(client, {
  marshallOptions: { removeUndefinedValues: true },
});

export function getUsersTable(env: EnvConfig): string {
  return env.USERS_TABLE;
}

export function getCourtsTable(env: EnvConfig): string {
  return env.COURTS_TABLE;
}

export function getBookingsTable(env: EnvConfig): string {
  return env.BOOKINGS_TABLE;
}

export async function getUserByEmail(tableName: string, email: string): Promise<UserItem | null> {
  try {
    const result = await docClient.send(new QueryCommand({
      TableName: tableName,
      IndexName: "EmailIndex",
      KeyConditionExpression: "entityType = :et AND email = :email",
      ExpressionAttributeValues: {
        ":et": "USER",
        ":email": email.toLowerCase().trim(),
      },
    }));
    return result.Items?.[0] as UserItem | null;
  } catch {
    return null;
  }
}

export async function getUserById(tableName: string, userId: string): Promise<UserItem | null> {
  try {
    const result = await docClient.send(new GetCommand({
      TableName: tableName,
      Key: { PK: `USER#${userId}`, SK: "METADATA" },
    }));
    return result.Item as UserItem | null;
  } catch {
    return null;
  }
}

export async function createUser(tableName: string, user: UserItem): Promise<void> {
  await docClient.send(new PutCommand({
    TableName: tableName,
    Item: user,
    ConditionExpression: "attribute_not_exists(PK)",
  }));
}

export async function getAllCourts(tableName: string): Promise<CourtItem[]> {
  const result = await docClient.send(new QueryCommand({
    TableName: tableName,
    KeyConditionExpression: "entityType = :et",
    ExpressionAttributeValues: { ":et": "COURT" },
  }));
  return (result.Items || []) as CourtItem[];
}

export async function getCourt(tableName: string, courtId: string): Promise<CourtItem | null> {
  const result = await docClient.send(new GetCommand({
    TableName: tableName,
    Key: { PK: `COURT#${courtId}`, SK: "METADATA" },
  }));
  return result.Item as CourtItem | null;
}

export async function getBookingsForCourtDate(tableName: string, courtId: string, date: string): Promise<BookingItem[]> {
  const result = await docClient.send(new QueryCommand({
    TableName: tableName,
    IndexName: "CourtDateIndex",
    KeyConditionExpression: "courtId = :cid AND #date = :d",
    ExpressionAttributeNames: { "#date": "date" },
    ExpressionAttributeValues: {
      ":cid": courtId,
      ":d": date,
    },
  }));
  return (result.Items || []) as BookingItem[];
}

export async function createBooking(tableName: string, booking: BookingItem): Promise<void> {
  await docClient.send(new PutCommand({
    TableName: tableName,
    Item: booking,
    ConditionExpression: "attribute_not_exists(PK)",
  }));
}

export async function getUserBookings(tableName: string, userId: string): Promise<BookingItem[]> {
  const result = await docClient.send(new QueryCommand({
    TableName: tableName,
    IndexName: "UserIdIndex",
    KeyConditionExpression: "userId = :uid",
    ExpressionAttributeValues: { ":uid": userId },
    ScanIndexForward: false,
  }));
  return (result.Items || []) as BookingItem[];
}

export async function getAllBookings(tableName: string): Promise<BookingItem[]> {
  const result = await docClient.send(new ScanCommand({
    TableName: tableName,
    Limit: 1000,
  }));
  return (result.Items || []) as BookingItem[];
}

export async function updateBookingStatus(tableName: string, bookingId: string, status: BookingItem["status"]): Promise<void> {
  await docClient.send(new UpdateCommand({
    TableName: tableName,
    Key: { PK: `BOOKING#${bookingId}`, SK: "METADATA" },
    UpdateExpression: "SET #status = :s, updatedAt = :u",
    ExpressionAttributeNames: { "#status": "status" },
    ExpressionAttributeValues: {
      ":s": status,
      ":u": new Date().toISOString(),
    },
  }));
}

export async function deleteBooking(tableName: string, bookingId: string): Promise<void> {
  await docClient.send(new DeleteCommand({
    TableName: tableName,
    Key: { PK: `BOOKING#${bookingId}`, SK: "METADATA" },
    ConditionExpression: "attribute_exists(PK)",
  }));
}
