import Community from '../models/community.model'
import Thread from '../models/thread.model'
import User from '../models/user.model'
import { FilterQuery, SortOrder } from 'mongoose'

export const createCommunity = async (
  clerkId: string,
  name: string,
  username: string,
  image: string,
  bio: string,
  createdById: string
) => {
  try {
    // Find the user with the provided unique id
    const user = await User.findOne({ clerkId: createdById })

    if (!user) {
      throw new Error('User not found') // Handle the case if the user with the id is not found
    }

    const createdCommunity = await Community.create({
      clerkId,
      name,
      username,
      image,
      bio,
      createdBy: user._id
    })

    // Update User model
    if (!user.communities.includes(createdCommunity._id)) {
      user.communities.push(createdCommunity._id)
      await user.save()
    }

    return createdCommunity
  } catch (error) {
    throw error
  }
}

export const getCommunityDetails = async (clerkId: string) => {
  try {
    const communityDetails = await Community.findOne({ clerkId }).populate([
      'createdBy',
      {
        path: 'members',
        model: User,
        select: 'name username image _id clerkId'
      }
    ])

    return communityDetails
  } catch (error) {
    throw error
  }
}

export const getCommunityPosts = async (objectId: string) => {
  try {
    const communityPosts = await Community.findById(objectId).populate({
      path: 'threads',
      model: Thread,
      populate: [
        {
          path: 'author',
          model: User,
          select: 'name image clerkId _id' // Select the "name" and "_id" fields from the "User" model
        },
        {
          path: 'children',
          model: Thread,
          populate: {
            path: 'author',
            model: User,
            select: 'image clerkId _id' // Select the "name" and "_id" fields from the "User" model
          }
        }
      ]
    })

    return communityPosts
  } catch (error) {
    throw error
  }
}

export const getCommunities = async ({
  searchString = '',
  pageNumber = 1,
  pageSize = 20,
  sortBy = 'desc'
}: {
  searchString?: string
  pageNumber?: number
  pageSize?: number
  sortBy?: SortOrder
}) => {
  try {
    const skipAmount = (pageNumber - 1) * pageSize

    // Create a case-insensitive regular expression for the provided search string.
    const regex = new RegExp(searchString, 'i')

    // Create an initial query object to filter communities.
    const query: FilterQuery<typeof Community> = {}

    // If the search string is not empty, add the $or operator to match either username or name fields.
    if (searchString.trim() !== '') {
      query.$or = [{ username: { $regex: regex } }, { name: { $regex: regex } }]
    }

    // Define the sort options for the fetched communities based on createdAt field and provided sort order.
    const sortOptions = { createdAt: sortBy }

    // Create a query to fetch the communities based on the search and sort criteria.
    const communitiesQuery = Community.find(query)
      .sort(sortOptions)
      .skip(skipAmount)
      .limit(pageSize)
      .populate('members')

    // Count the total number of communities that match the search criteria (without pagination).
    const [totalCommunitiesCount, communities] = await Promise.all([
      Community.countDocuments(query),
      communitiesQuery.exec()
    ])

    // Check if there are more communities beyond the current page.
    const isNext = totalCommunitiesCount > skipAmount + communities.length

    return { communities, isNext }
  } catch (error) {
    throw error
  }
}

export const addMemberToCommunity = async (communityClerkId: string, memberClerkId: string) => {
  try {
    // Find the community by its unique id
    const community = await Community.findOne({ clerkId: communityClerkId })

    if (!community) {
      throw new Error('Community not found')
    }

    // Find the user by their unique id
    const user = await User.findOne({ clerkId: memberClerkId })

    if (!user) {
      throw new Error('User not found')
    }

    // Check if the user is already a member of the community
    if (community.members.includes(user._id)) {
      throw new Error('User is already a member of the community')
    }

    // Add the user's _id to the members array in the community
    community.members.push(user._id)
    // await community.save()

    // Add the community's _id to the communities array in the user
    user.communities.push(community._id)
    // await user.save()

    await Promise.all([community.save(), user.save()])

    return community
  } catch (error) {
    throw error
  }
}

export const removeUserFromCommunity = async (userClerkId: string, communityClerkId: string) => {
  try {
    // const userIdObject = await User.findOne({ clerkId: userClerkId }, { _id: 1 })
    // const communityIdObject = await Community.findOne({ clerkId: communityClerkId }, { _id: 1 })
    const [userIdObject, communityIdObject] = await Promise.all([
      User.findOne({ clerkId: userClerkId }, { _id: 1 }),
      Community.findOne({ clerkId: communityClerkId }, { _id: 1 })
    ])

    if (!userIdObject) {
      throw new Error('User not found')
    }

    if (!communityIdObject) {
      throw new Error('Community not found')
    }

    // Remove the user's _id from the members array in the community
    // await Community.updateOne({ _id: communityIdObject._id }, { $pull: { members: userIdObject._id } })

    // Remove the community's _id from the communities array in the user
    // await User.updateOne({ _id: userIdObject._id }, { $pull: { communities: communityIdObject._id } })

    await Promise.all([
      Community.updateOne({ _id: communityIdObject._id }, { $pull: { members: userIdObject._id } }),
      User.updateOne({ _id: userIdObject._id }, { $pull: { communities: communityIdObject._id } })
    ])

    return { success: true }
  } catch (error) {
    throw error
  }
}

export const updateCommunityInfo = async (communityClerkId: string, name: string, username: string, image: string) => {
  try {
    // Find the community by its _id and update the information
    const updatedCommunity = await Community.findOneAndUpdate({ clerkId: communityClerkId }, { name, username, image })

    if (!updatedCommunity) {
      throw new Error('Community not found')
    }

    return updatedCommunity
  } catch (error) {
    throw error
  }
}

export const deleteCommunity = async (communityClerkId: string) => {
  try {
    // Find the community by its ID and delete it
    const deletedCommunity = await Community.findOneAndDelete({
      clerkId: communityClerkId
    })

    if (!deletedCommunity) {
      throw new Error('Community not found')
    }

    // Delete all threads associated with the community
    await Thread.deleteMany({ community: deletedCommunity._id })

    // Find all users who are part of the community
    const communityUsers = await User.find({ communities: deletedCommunity._id })

    // Remove the community from the 'communities' array for each user
    const updateUserPromises = communityUsers.map((user) => {
      user.communities.pull(deletedCommunity._id)
      return user.save()
    })

    await Promise.all(updateUserPromises)

    return deletedCommunity
  } catch (error) {
    throw error
  }
}

export const deleteCommunityV2 = async (communityClerkId: string) => {
  try {
    const deletedCommunity = await Community.findOneAndDelete({
      clerkId: communityClerkId
    })

    if (!deletedCommunity) {
      throw new Error('Community not found')
    }

    // Tìm tất cả các thread thuộc community
    const threads = await Thread.find({ community: deletedCommunity._id })

    // Tạo danh sách tất cả các thread cần xóa (bao gồm thread con)
    const threadIdsToDelete: string[] = []

    const getAllChildThreads = async (threadIds: string[]) => {
      const children = await Thread.find({ parentId: { $in: threadIds } })

      if (children.length === 0) return

      const childIds = children.map((child) => child._id.toString())
      threadIdsToDelete.push(...childIds)
      await getAllChildThreads(childIds)
    }

    // Thêm các thread thuộc community vào danh sách xóa
    threads.forEach((thread) => threadIdsToDelete.push(thread._id.toString()))

    // Tìm tất cả các thread con và thêm vào danh sách
    await getAllChildThreads(threadIdsToDelete)

    // Xóa tất cả các thread trong danh sách
    await Thread.deleteMany({ _id: { $in: threadIdsToDelete } })

    // Cập nhật user:
    // - Xóa communityId khỏi communities của user
    // - Xóa các threadId khỏi threads của user
    await User.updateMany(
      { communities: deletedCommunity._id },
      {
        $pull: {
          communities: deletedCommunity._id,
          threads: { $in: threadIdsToDelete }
        }
      }
    )

    // 6. Xóa community
    await Community.deleteOne({ _id: deletedCommunity._id })

    return deletedCommunity
  } catch (error) {
    throw error
  }
}
