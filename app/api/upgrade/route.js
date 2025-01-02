import { auth } from "@/auth";
import User from "@/models/User";
import connectMongo from "@/libs/mongoose";

export async function POST(req) {
  try {
    // Get the session from the request
    const session = await auth();

    if (!session) {
      return NextResponse.json({ error: "Not authorized" }, { status: 401 });
    }

    await connectMongo();

    // Fetch the user from the database
    const user = await User.findById(session.user.id);

    // Check if the user exists
    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    // Increment the user's credits by 500
    user.credits += 500;
    await user.save(); // Save updated user data

    return NextResponse.json(
      { success: true, credits: user.credits },
      { status: 200 }
    );
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
