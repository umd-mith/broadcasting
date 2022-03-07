exports.createPages = async ({
  actions: { createPage },
  graphql,
  pathPrefix,
}) => {
  await cpf(createPage, graphql, pathPrefix)
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
