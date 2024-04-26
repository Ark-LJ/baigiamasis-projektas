import Movies from '../models/moviesModel.js'

export const getRecommendedMovies = async (req, res) => {
    try {
        let sortBy = req.query.sortBy
        if (!Array.isArray(sortBy)) {
            sortBy = [sortBy]
        }
        const limit = parseInt(req.query.limit)

        const sortCriteria = sortBy.map(option => {
            switch (option) {
                case 'genres':
                    return ['genres', 1]
                case 'rating':
                    return ['imdb_rating', -1]
                case 'rating':
                    return ['release_year', -1]
                default:
                    return [option, -1]
            }
        })

        const recommendedMovies = await Movies.find({})
            .sort(sortCriteria)
            .limit(limit)
        res.status(200).json(recommendedMovies);
    } catch (error) {
        console.error('Error fetching recommended movies:', error)
        res.status(500).json({ error: 'Internal server error' })
    }
}