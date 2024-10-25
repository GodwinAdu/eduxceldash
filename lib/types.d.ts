interface IUser extends Document {
    _id:string;
    username: string;
    fullName: string;
    email: string;
    password: string;
    phone?: string;
    imageUrl?: string;
    referralCode?: string;
    coinId: Schema.Types.ObjectId;
    teamMembers: Schema.Types.ObjectId[];
    threads: Schema.Types.ObjectId[];
    stage?: string;
    level?: string;
    isBanned: boolean;
    isDeleted: boolean;
    emailVerified: boolean;
    phoneVerified: boolean;
    loginAttempts: number;
    lastLogin?: Date;
    isActive: boolean;
    accountLocked: boolean;
    permissions: {
        deleteAccount: boolean;
    };
    preferences: {
        notifications: {
            email: boolean;
            sms: boolean;
        };
    };
    metadata?: {
        browser?: string;
        device?: string;
        location?: string;
    };
    createdAt?: Date;
    updatedAt?: Date;
}
