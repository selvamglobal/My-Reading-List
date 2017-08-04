import React, { Component } from 'react'
import { Link } from 'react-router-dom'
class SearchIcon extends Component {
    render() {
        return (
            <div className="open-search">
                <Link to="/search"></Link>
            </div>
        )
    }
}
export default SearchIcon