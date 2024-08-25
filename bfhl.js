exports.handler = async (event) => {
    if (event.httpMethod === 'POST') {
        const body = JSON.parse(event.body);
        const { user_id, college_email, college_roll, numbers, alphabets } = body;

        const highestLowercase = alphabets.filter(char => char === char.toLowerCase()).sort().pop();

        return {
            statusCode: 200,
            body: JSON.stringify({
                status: "success",
                user_id,
                college_email,
                college_roll,
                numbers,
                alphabets,
                highest_lowercase: highestLowercase,
                is_success: true
            }),
        };
    }

    if (event.httpMethod === 'GET') {
        return {
            statusCode: 200,
            body: JSON.stringify({ operation_code: 1 }),
        };
    }

    return {
        statusCode: 405,
        body: JSON.stringify({ message: 'Method Not Allowed' }),
    };
};
