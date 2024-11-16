import clubsData from "../data/clubs.data.json" assert { type: 'json' };

export const getClubs = (req, res) => {
    try {
        const data = clubsData.clubs;
        return res.status(200).json(data);
    } catch (error) {
        console.log(error.message);
        res.status(500).json({ error: "Internal Server error" });
    }
}

export const getClubById = (req, res) => {
    try {
        const id = req.params.id;
        const data = clubsData.clubs.find(club => club.id === id);
        if (data) {
            res.status(200).json(data);
        } else {
            res.status(400).json({ error: "No club such found" });
        }
    } catch (error) {
        console.log(error.message);
        res.status(500).json({ error: "Internal Server error" });
    }
}