import mongoose from 'mongoose';
import User from '../models/User';
import Team from '../models/Team';
import Activity from '../models/Activity';
import Leaderboard from '../models/Leaderboard';
import Workout from '../models/Workout';

const connectionString = process.env.MONGODB_URI || 'mongodb://localhost:27017/octofit_db';

/**
 * Seed the octofit_db database with test data
 */
async function seedDatabase() {
  try {
    await mongoose.connect(connectionString);

    console.log('Connected to octofit_db');

    // Clear existing data
    await User.deleteMany({});
    await Team.deleteMany({});
    await Activity.deleteMany({});
    await Leaderboard.deleteMany({});
    await Workout.deleteMany({});
    console.log('Cleared existing data');

    // Seed Teams
    const team1 = await Team.create({ name: 'Fitness Ninjas' });
    const team2 = await Team.create({ name: 'Cardio Kings' });
    const team3 = await Team.create({ name: 'Strength Squad' });
    console.log('Teams created');

    // Seed Users
    const users = await User.create([
      { name: 'Alice Johnson', email: 'alice@example.com', age: 28, team: team1._id },
      { name: 'Bob Smith', email: 'bob@example.com', age: 32, team: team1._id },
      { name: 'Charlie Brown', email: 'charlie@example.com', age: 25, team: team2._id },
      { name: 'Diana Prince', email: 'diana@example.com', age: 29, team: team2._id },
      { name: 'Eve Wilson', email: 'eve@example.com', age: 31, team: team3._id },
      { name: 'Frank Miller', email: 'frank@example.com', age: 26, team: team3._id },
    ]);
    console.log('Users created');

    // Update teams with members
    await Team.updateOne({ _id: team1._id }, { members: [users[0]._id, users[1]._id] });
    await Team.updateOne({ _id: team2._id }, { members: [users[2]._id, users[3]._id] });
    await Team.updateOne({ _id: team3._id }, { members: [users[4]._id, users[5]._id] });
    console.log('Teams updated with members');

    // Seed Activities
    const activities = await Activity.create([
      { user: users[0]._id, type: 'Running', duration: 45, caloriesBurned: 450, date: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000) },
      { user: users[0]._id, type: 'Cycling', duration: 60, caloriesBurned: 500, date: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000) },
      { user: users[1]._id, type: 'Weight Training', duration: 75, caloriesBurned: 600, date: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000) },
      { user: users[2]._id, type: 'Running', duration: 40, caloriesBurned: 400 },
      { user: users[2]._id, type: 'Swimming', duration: 50, caloriesBurned: 480 },
      { user: users[3]._id, type: 'Yoga', duration: 60, caloriesBurned: 200 },
      { user: users[4]._id, type: 'Weight Training', duration: 90, caloriesBurned: 700 },
      { user: users[5]._id, type: 'Hiking', duration: 120, caloriesBurned: 650 },
    ]);
    console.log('Activities created');

    // Seed Leaderboard
    const leaderboards = await Leaderboard.create([
      { team: team1._id, points: 1550, rank: 1 },
      { team: team2._id, points: 1280, rank: 2 },
      { team: team3._id, points: 1350, rank: 3 },
    ]);
    console.log('Leaderboard entries created');

    // Seed Workouts
    const workouts = await Workout.create([
      { name: 'Morning Run', description: 'A refreshing 5K morning run', difficulty: 'beginner', suggestedFor: [users[0]._id, users[2]._id] },
      { name: 'HIIT Training', description: 'High Intensity Interval Training', difficulty: 'intermediate', suggestedFor: [users[1]._id, users[4]._id] },
      { name: 'Full Body Strength', description: 'Complete full body strength training', difficulty: 'advanced', suggestedFor: [users[1]._id, users[4]._id, users[5]._id] },
      { name: 'Yoga & Stretching', description: 'Relaxing yoga session', difficulty: 'beginner', suggestedFor: [users[3]._id] },
      { name: 'Cycling Challenge', description: 'Long distance cycling', difficulty: 'intermediate', suggestedFor: [users[0]._id, users[2]._id] },
    ]);
    console.log('Workouts created');

    console.log('Database seeding complete');
    await mongoose.disconnect();
    process.exit(0);
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  }
}

seedDatabase();
