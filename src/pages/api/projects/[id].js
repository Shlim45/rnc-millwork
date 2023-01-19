import {projects} from "@/data"

export default function handler(req, res) {
    const id = req.query.id;
    const filtered = projects.filter(project => project.id === id);

    if (filtered.length > 0)
        res.status(200).json(filtered[0]);
    else
        res.status(404).json({message: `Project ID ${id} not found.`})
}