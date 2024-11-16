import clubsData from "../data/clubs.data.json" assert { type: 'json' };

export const getClubs = (req, res) => {
    try {
        const data = clubsData.clubs;
        return res.status(200).json(data);
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: error.message });
    }
}