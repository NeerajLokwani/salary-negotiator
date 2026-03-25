export async function Negotiate({
  role,
  city,
  experience,
  currentOffer,
  companySize,
}: {
  role: string;
  city: string;
  experience: number;
  currentOffer: number;
  companySize: string;
}) {
  try {
    const response = await fetch('http://localhost:5050/api/negotiate', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        role,
        city,
        experience,
        currentOffer,
        companySize,
      }),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error negotiating salary:', error);
    throw error;
  }
}