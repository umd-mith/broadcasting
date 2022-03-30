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
        htmlAst: md.htmlAst
      },
    })
  })
}

async function cpf(createPage, graphql) {
  results = await graphql(`
    {
      allEntitiesJson(
        filter: {CPF_Pages_ID: {ne: null}}
      ) {
        nodes {
          id
          CPF_Pages_ID
        }
      }
  } 
  `)


  results.data.allEntitiesJson.nodes.forEach(entity => {
    createPage({
      path: `/entity/${entity.CPF_Pages_ID}`,
      component: require.resolve('./src/templates/entity.tsx'),
      context: {
        id: entity.id
      },
    })
  })
}
