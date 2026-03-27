// src/modules/creator/creator.controller.ts
import { Request, Response } from 'express';
import {
   sendPaginatedSuccess,
   sendError,
   ErrorCode,
} from '../../utils/api-response.utils';
import { getPaginatedCreators } from './creator.service';
import { parseCreatorSortOptions } from './creator.utils';
import {
   validatePageSize,
   PageSizeExceededError,
} from '../../utils/pagination-guard.utils';

export async function listCreators(req: Request, res: Response) {
   try {
      const page = parseInt(req.query.page as string) || 1;
      const limitInput = parseInt(req.query.limit as string) || 10;
      const sortBy = req.query.sortBy as string;
      const sortOrder = req.query.sortOrder as string;

      if (page < 1) {
         return sendError(
            res,
            400,
            ErrorCode.VALIDATION_ERROR,
            'Invalid pagination parameters'
         );
      }

      // Validate page size using the reusable guard
      const limit = validatePageSize(limitInput);

      const sort = parseCreatorSortOptions(sortBy, sortOrder);

      const { creators, meta } = await getPaginatedCreators({
         page,
         limit,
         sort,
      });

      return sendPaginatedSuccess(
         res,
         creators,
         meta,
         200,
         'Creators retrieved successfully'
      );
   } catch (error) {
      if (error instanceof PageSizeExceededError) {
         return sendError(res, 400, ErrorCode.VALIDATION_ERROR, error.message);
      }
      console.error('Error listing creators:', error);
      return sendError(
         res,
         500,
         ErrorCode.INTERNAL_ERROR,
         'Failed to retrieve creators'
      );
   }
}
