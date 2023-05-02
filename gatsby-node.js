exports.createPages = async ({
  actions: { createPage },
  graphql,
  pathPrefix,
}) => {
  await cpf(createPage, graphql)
  await makePages(createPage, graphql)
}

async function makePages(createPage, graphql) {
  results = await graphql(`
    {
      allExhibsJson {
        nodes {
          slug
          title
          author
          image
          imageDesc
        }
      }
      allMarkdownRemark {
        nodes {
          htmlAst
          frontmatter {
            path
          }
        }
      }
    }
  `)

  results.data.allMarkdownRemark.nodes.forEach(md => {
    const {path} = md.frontmatter
    // If we ever need to create other pages from MD other than home, create a content.tsx template and use this:
    // const template = path === '/' ? './src/templates/home.tsx' : './src/templates/content.tsx'
    const template = './src/templates/home.tsx'

    const component = require.resolve(template)

    createPage({
      path,
      component,
      context: {
        htmlAst: md.htmlAst,
        exhibs: results.data.allExhibsJson.nodes
      },
    })
  })
}

async function cpf(createPage, graphql) {
  results = await graphql(`
    {
      allEntitiesJson(
        filter: {cpfPageID: {ne: null}}
      ) {
        nodes {
          id
          cpfPageID
        }
      }
  } 
  `)


  results.data.allEntitiesJson.nodes.forEach(entity => {
    createPage({
      path: `/entity/${entity.cpfPageID}`,
      component: require.resolve('./src/templates/entity.tsx'),
      context: {
        id: entity.id
      },
    })
  })
}
