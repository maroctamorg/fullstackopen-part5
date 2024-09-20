const { test, describe, expect, beforeEach } = require('@playwright/test')
const { loginWith, createBlog } = require('./helper')

describe('Blog app', () => {
  beforeEach(async ({ page, request }) => {
    await request.post('/api/testing/reset')
    await request.post('/api/users', {
      data: {
        name: 'root',
        username: 'root',
        password: 'sekret'
      }
    })
    await page.goto('')
  })

  test('login form is shown', async ({ page }) => {
    await expect(page.getByText('Log in to application')).toBeVisible()
    await expect(page.getByTestId('username')).toBeVisible()
    await expect(page.getByTestId('password')).toBeVisible()
  })

  test('user can login with correct credentials', async ({ page }) => {
    await loginWith(page, 'root', 'sekret')
    await expect(page.getByText('root logged-in')).toBeVisible()
  })

  test('login fails with wrong password', async ({ page }) => {
    await loginWith(page, 'root', 'wrong')

    const errorDiv = await page.locator('.error')
    await expect(errorDiv).toContainText('wrong username or password')
    await expect(errorDiv).toHaveCSS('border-style', 'solid')
    await expect(errorDiv).toHaveCSS('color', 'rgb(255, 0, 0)')
    await expect(page.getByText('root logged-in')).not.toBeVisible()
  })  

  describe('when logged in', () => {
    beforeEach(async ({ page }) => {
      await loginWith(page, 'root', 'sekret')
    })

    test('a new blog can be created', async ({ page }) => {
      await createBlog(page, 'McLovin', 'Seth Rogen', 'https://www.imdb.com/title/tt0829482/')
      await expect(page.getByText('McLovin Seth Rogen')).toBeVisible()
    })

    describe('and a blog exists', () => {
      beforeEach(async ({ page }) => {
        await createBlog(page, 'McLovin2', 'Seth Rogen', 'https://www.imdb.com/title/tt0829482/')
        await createBlog(page, 'McLovin3', 'Seth Rogen', 'https://www.imdb.com/title/tt0829482/')
        await createBlog(page, 'McLovin4', 'Seth Rogen', 'https://www.imdb.com/title/tt0829482/')
      })
  
      test('a blog can be liked', async ({ page }) => {
        await page.pause()
        const otherBlogText = await page.getByText('McLovin2 Seth Rogen')
        const otherBlogElement = await otherBlogText.locator('..')
      
        await otherBlogElement.getByRole('button', { name: 'view' }).click()
        await expect(otherBlogElement.getByText('likes 0')).toBeVisible()
        await otherBlogElement.getByRole('button', { name: 'like' }).click()
        await expect(otherBlogElement.getByText('likes 1')).toBeVisible()
      })

      test('a blog can be deleted', async ({ page }) => {
        const otherBlogText = await page.getByText('McLovin3 Seth Rogen')
        const otherBlogElement = await otherBlogText.locator('..')
      
        await otherBlogElement.getByRole('button', { name: 'view' }).click()
        await otherBlogElement.getByRole('button', { name: 'remove' }).click()
        await expect(otherBlogElement).not.toBeVisible
      })

      test('user cannot delete a blog created by another user', async ({ page, request }) => {
        await createBlog(page, 'McLovin5', 'Seth Rogen', 'https://www.imdb.com/title/tt0829482/')
        await page.click('text="logout"')
        await request.post('/api/users', {
            data: {
                name: 'root2',
                username: 'root2',
                password: 'sekret'
            }
        })
        await loginWith(page, 'root2', 'sekret')
        const otherBlogText = await page.getByText('McLovin5 Seth Rogen')
        const otherBlogElement = await otherBlogText.locator('..')
        await expect(otherBlogElement).not.toContain('remove')
    })

      test('blogs are ordered by likes', async ({ page }) => {
        const blogText = await page.getByText('McLovin2 Seth Rogen')
        const blogElement = await blogText.locator('..')
      
        await blogElement.getByRole('button', { name: 'view' }).click()
        await blogElement.getByRole('button', { name: 'like' }).click()
        await blogElement.getByRole('button', { name: 'like' }).click()
        await blogElement.getByRole('button', { name: 'like' }).click()
        await blogElement.getByRole('button', { name: 'like' }).click()
        await blogElement.getByRole('button', { name: 'like' }).click()

        const otherBlogText = await page.getByText('McLovin4 Seth Rogen')
        const otherBlogElement = await otherBlogText.locator('..')
      
        await otherBlogElement.getByRole('button', { name: 'view' }).click()
        await otherBlogElement.getByRole('button', { name: 'like' }).click()
        await otherBlogElement.getByRole('button', { name: 'like' }).click()
        await otherBlogElement.getByRole('button', { name: 'like' }).click()
        await otherBlogElement.getByRole('button', { name: 'like' }).click()
        await otherBlogElement.getByRole('button', { name: 'like' }).click()
        await otherBlogElement.getByRole('button', { name: 'like' }).click()
        await otherBlogElement.getByRole('button', { name: 'like' }).click()
        await otherBlogElement.getByRole('button', { name: 'like' }).click()
        await otherBlogElement.getByRole('button', { name: 'like' }).click()
      
        const likes = await page.getByTestId('number-of-likes').allTextContents()
        await expect(likes).toEqual([
          '9', '5', '0'
        ])
      })
    })
  })  
})