import mongoose from "mongoose";

const taskSchema = mongoose.Schema({
    user:{
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    },
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    priority:{
        type: String,
        enum: ['low', 'medium', 'high'],
        default: 'medium'
    },
    status: {
        type: String,
        enum: ['pending',  'completed'],
        default: 'pending'
    },
    dueDate:{
        type: Date,
        required: true
    }
},{
    timestamps: true
})

const Task = mongoose.model('Task', taskSchema);

export default Task;