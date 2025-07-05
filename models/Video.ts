import bcrypt from 'bcryptjs'
import { model, models, Schema, Types } from 'mongoose';

export const VIDEO_DIMENSIONS = {
    width: 1080,
    height: 1920
} as const;

export interface IVideo {
    _id?: Types.ObjectId
    title: string
    description?: string;
    videoUrl: string;
    thumbnailUrl: string;
    controls?: boolean
    transformation?: {
        height: number;
        width: number;
        quality?: number
    }
}

const videoSchema = new Schema<IVideo>(
    {
        title: { type: String, required: true },
        description: { type: String },
        videoUrl: { type: String, required: true },
        thumbnailUrl: { type: String, required: true },
        controls: { type: Boolean, default: true },
        transformation: {
            height: { type: Number, default: VIDEO_DIMENSIONS.height, required: true },
            width: { type: Number, default: VIDEO_DIMENSIONS.width, required: true },
            quality: { type: Number, min: 1, max: 100 },
        },
    },
    {
        timestamps: true,
    }
)

const Video = models?.Video || model<IVideo>("Video", videoSchema);

export default Video