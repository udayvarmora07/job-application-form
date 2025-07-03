import cities from "../city.json" with { type: "json" }
import states from "../state.json" with { type: "json" }

export const getCities = (req, res) => {
    res.status(200).json(cities)
}

export const getStates = (req, res) => {
    res.status(200).json(states)
}