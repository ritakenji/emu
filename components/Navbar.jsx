import Link from "next/link"
import styled from "styled-components"

export default function NavBar () {
    return <div>
        <HomeLink href="/">
        </HomeLink>
    </div>
   
}

const HomeLink = styled(Link)`
`;

/* 

The Navigation bar displays links to all pages that are accessible through the home page
Fixed at the bottom and visible on all pages

Acceptance criteria

The navigation bar shows a visible link to all of the sibling pages of home

The navigation bar is visible on all pages so that it can be used from whereever

The navigation bar is scalable and can be extended/updated when necessary


Tasks

Create a feature branch feature/navigation

Create Navigation component

Add Navigation to Home page */