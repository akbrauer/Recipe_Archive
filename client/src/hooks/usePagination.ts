import { useMemo } from "react";

interface PageProps {
    currentPage: number;
    totalCount: number;
    items_per_page: number;
}

const range = (start: number, end: number) => {
    const length = end - start + 1;
    return Array.from({ length }, (_, idx) => idx + start);
}

export const usePagination = ({ currentPage, totalCount, items_per_page }: PageProps) => {
    const paginationRange = useMemo(() => {
        const totalPageCount = Math.ceil(totalCount / items_per_page);
        //Max number of pagination links shown
        const totalPageNumbers = 7;
    /*
        Case 1:
        If the number of pages is less than the page numbers we want to show in our
        paginationComponent, we return the range [1..totalPageCount]
    */
        if(totalPageNumbers >= totalPageCount){
            return range(1, totalPageCount);
        }

        const leftSiblingIndex = Math.max(currentPage - 1, 1);
        const rightSiblingIndex = Math.min(currentPage + 1, totalPageCount);

        const shouldShowLeftDots = leftSiblingIndex > 2;
        const shouldShowRightDots = rightSiblingIndex < totalPageCount - 2;

        const firstPageIndex = 1;
        const lastPageIndex = totalPageCount;

        /*
            Case 2: No left dots to be shown, but right dots to be shown
        */

        if(!shouldShowLeftDots && shouldShowRightDots){
            const leftItemCount = 5;
            const leftRange = range(1, leftItemCount);

            return[...leftRange, 'DOTS', totalPageCount]
        }

        /*
            Case 3: Left dots to be shown, but no right dots to be shown
        */

        if(shouldShowLeftDots && !shouldShowRightDots){
            const rightItemCount = 5;
            const rightRange = range(totalPageCount - rightItemCount + 1, totalPageCount);

            return[firstPageIndex, 'DOTS', ...rightRange];
        }

        /*
            Case 4: Both left and right dots to be shown
        */

        if(shouldShowLeftDots && shouldShowRightDots){
            const middleRange = range(leftSiblingIndex, rightSiblingIndex);
            return [firstPageIndex, 'DOTS', ...middleRange, 'DOTS', lastPageIndex];
        }

    }, [totalCount, items_per_page, currentPage]);
    return paginationRange;
}