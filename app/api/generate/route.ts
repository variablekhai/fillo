import { openai } from "@ai-sdk/openai";
import { generateObject } from "ai";
import { z } from "zod";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    console.log("API Received Body:", JSON.stringify(body, null, 2));
    const { weekDetails, fieldsToGenerate, weekConfig } = body;

    const prompt = `
    You are an intelligent assistant helping a user fill their weekly logbook.

    CONTEXT:
    - Week Number: ${weekConfig?.weekNumber || "Unknown"}
    - Week Start Date: ${weekConfig?.startDate || "Not specified"}
    - User's Description of the Week: "${weekDetails}"

    GOAL:
    Fill in the fields provided in "Target Fields".

    DATA:
    Target Fields (List of fields to fill):
    ${JSON.stringify(fieldsToGenerate, null, 2)}

    INSTRUCTIONS:
    1. **MANDATORY**: Iterate through "Target Fields".
    2. For each field:
       - If 'currentValue' is empty OR needs improvement based on "User's Description", generate a value.
       - If 'currentValue' is already good, you may keep it or skip it (but it's safer to regenerate if unsure).
    
    3. **Field Filling Logic**:
        a. **'week' role**: Set to "${weekConfig?.weekNumber}".
        b. **'date' role**: Calculate the date based on 'pageNumber' and Week Start Date.
           - Page 1 = Start Date. Page 2 = Start Date + 1 day, etc.
           - Format: YYYY-MM-DD.
        c. **'day' role**: Full day name (e.g., "Monday") matching the date.
        d. **'text' / Content fields**: 
           - **FORMAT**: Use BULLET POINTS (start lines with "- ").
           - **VOLUME**: 3-5 detailed bullet points.
           - **CONTENT**: Expand on "User's Description" relevant to the field name (e.g. "Activities", "Reflection").
           - Tone: Professional, technical.

    OUTPUT:
    Return valid JSON matching the schema.
    `;

    const { object } = await generateObject({
      model: openai("gpt-4o-mini"),
      system: "You are a helpful internship logbook assistant.",
      schema: z.object({
        updates: z.array(
          z.object({
            identifier: z
              .string()
              .describe("The exact key format 'PageInstanceID:FieldID'"),
            value: z.string().describe("The generated content for this field"),
          }),
        ),
      }),
      prompt: prompt,
    });

    // Convert back to the format the frontend expects: Record<string, string>
    const updatesRecord: Record<string, string> = {};
    object.updates.forEach((item) => {
      updatesRecord[item.identifier] = item.value;
    });

    console.log("AI Structured Output:", updatesRecord);

    return Response.json(updatesRecord);
  } catch (error) {
    console.error("AI Generation Error:", error);
    return new Response(JSON.stringify({ error: "Failed to generate logs" }), {
      status: 500,
    });
  }
}
